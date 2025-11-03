package com.fiap.fintech.backend.service;

import org.springframework.stereotype.Service;

import com.fiap.fintech.backend.exception.BadRequestException;
import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.repository.UsuarioRepository;
import com.fiap.fintech.backend.util.JwtUtil;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UsuarioRepository usuarioRepository, JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.jwtUtil = jwtUtil;
    }

    public String authenticateAndGetToken(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new BadRequestException("Usuário não encontrado");
        }
        // NOTE: senha currently stored in plain text. In production, hash and verify.
        if (usuario.getSenha() == null || !usuario.getSenha().equals(senha)) {
            throw new BadRequestException("Senha inválida");
        }

        return jwtUtil.generateToken(usuario);
    }
}
