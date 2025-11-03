package com.fiap.fintech.backend.util;

import java.util.Date;
import java.nio.charset.StandardCharsets;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fiap.fintech.backend.model.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${jwt.secret:}")
    private String jwtSecret;

    @Value("${jwt.expiration:3600000}")
    private long jwtExpirationMs;

    private SecretKey signingKey;

    @PostConstruct
    public void init() {
        try {
            if (jwtSecret != null && !jwtSecret.isBlank()) {
                // try base64 decode first
                try {
                    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
                    if (keyBytes.length < 32) throw new IllegalArgumentException("Key too short");
                    signingKey = Keys.hmacShaKeyFor(keyBytes);
                } catch (Exception e) {
                    // fallback to raw UTF-8 bytes
                    byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
                    if (keyBytes.length >= 32) {
                        signingKey = Keys.hmacShaKeyFor(keyBytes);
                    } else {
                        // generate a secure random key if provided secret is too small
                        signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
                        logger.warn("Provided jwt.secret is too weak; generated a secure random key to use instead. For persistent tokens set a Base64-encoded 256+ bit secret in application.properties as 'jwt.secret'.");
                    }
                }
            } else {
                signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
                logger.info("No jwt.secret provided; generated a secure random key for signing (tokens will be invalidated on restart).");
            }
        } catch (Exception ex) {
            signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
            logger.error("Failed to initialize signing key, using generated key instead.", ex);
        }
    }

    public String generateToken(Usuario usuario) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(String.valueOf(usuario.getId_usuario()))
                .claim("nome", usuario.getNomeCompleto())
                .claim("email", usuario.getEmail())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(signingKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(signingKey).build().parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(signingKey).build().parseClaimsJws(token).getBody();
        String sub = claims.getSubject();
        return sub != null ? Long.parseLong(sub) : null;
    }
}
