package com.fiap.fintech.backend.service;

import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Usuario salvar(Usuario usuario) {
        return repository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario novo) {
        Usuario usuario = buscarPorId(id);
        if (usuario != null) {
            usuario.setNomeCompleto(novo.getNomeCompleto());
            usuario.setEmail(novo.getEmail());
            usuario.setSenha(novo.getSenha());
            return repository.save(usuario);
        }
        return null;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
