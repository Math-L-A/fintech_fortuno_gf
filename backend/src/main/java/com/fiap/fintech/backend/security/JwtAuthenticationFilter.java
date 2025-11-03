package com.fiap.fintech.backend.security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.repository.UsuarioRepository;
import com.fiap.fintech.backend.util.JwtUtil;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UsuarioRepository usuarioRepository) {
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            final String token = authHeader.substring(7);
            try {
                if (jwtUtil.validateToken(token)) {
                    Long userId = jwtUtil.getUserIdFromToken(token);
                    if (userId != null) {
                        Usuario usuario = usuarioRepository.findById(userId).orElse(null);
                        if (usuario != null) {
                            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                    usuario, null, java.util.Collections.emptyList());
                            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                        }
                    }
                }
            } catch (Exception ex) {
                // token invalid -> security context left empty, request may be rejected later
            }
        }

        filterChain.doFilter(request, response);
    }
}
