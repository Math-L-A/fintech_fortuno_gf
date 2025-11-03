package com.fiap.fintech.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.repository.UsuarioRepository;
import com.fiap.fintech.backend.service.AuthService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UsuarioRepository usuarioRepository;

    public AuthController(AuthService authService, UsuarioRepository usuarioRepository) {
        this.authService = authService;
        this.usuarioRepository = usuarioRepository;
    }

    public static class LoginRequest {
        public String email;
        public String senha;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        String token = authService.authenticateAndGetToken(req.email, req.senha);
        Usuario usuario = usuarioRepository.findByEmail(req.email);
        // remove senha before returning
        usuario.setSenha(null);

        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("usuario", usuario);
        body.put("issuedAt", LocalDateTime.now());

        return ResponseEntity.ok(body);
    }
}
