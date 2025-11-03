package com.fiap.fintech.backend.service;

import com.fiap.fintech.backend.exception.BadRequestException;
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

    public Usuario buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public List<Usuario> buscarPorNomeParcial(String nome) {
        return repository.buscarPorNomeParcial(nome);
    }

    public Usuario salvar(Usuario usuario) {
        if (usuario == null) throw new BadRequestException("Usuário não pode ser nulo.");
        if (usuario.getNomeCompleto() == null || usuario.getNomeCompleto().isBlank())
            throw new BadRequestException("Nome completo é obrigatório.");
        if (usuario.getEmail() == null || usuario.getEmail().isBlank())
            throw new BadRequestException("Email é obrigatório.");
        if (usuario.getSenha() == null || usuario.getSenha().isBlank())
            throw new BadRequestException("Senha é obrigatória.");
        if (repository.existsByEmail(usuario.getEmail()))
            throw new BadRequestException("Já existe um usuário cadastrado com o email informado.");
        return repository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario novo) {
        if (novo == null) throw new BadRequestException("Dados para atualização não podem ser nulos.");
        Usuario usuario = buscarPorId(id);
        if (usuario != null) {
            if (novo.getNomeCompleto() != null && !novo.getNomeCompleto().isBlank())
                usuario.setNomeCompleto(novo.getNomeCompleto());
            if (novo.getEmail() != null && !novo.getEmail().isBlank()) {
                // se email mudou e já existe outro com esse email, bloqueia
                if (!novo.getEmail().equals(usuario.getEmail()) && repository.existsByEmail(novo.getEmail()))
                    throw new BadRequestException("Já existe um usuário cadastrado com o email informado.");
                usuario.setEmail(novo.getEmail());
            }
            if (novo.getSenha() != null && !novo.getSenha().isBlank())
                usuario.setSenha(novo.getSenha());
            return repository.save(usuario);
        }
        return null;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
