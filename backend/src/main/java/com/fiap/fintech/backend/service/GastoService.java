package com.fiap.fintech.backend.service;

import com.fiap.fintech.backend.model.CategoriaGasto;
import com.fiap.fintech.backend.model.Gasto;
import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.repository.GastoRepository;
import com.fiap.fintech.backend.exception.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GastoService {
    private final GastoRepository repository;
    private final UsuarioService usuarioService;
    private final CategoriaGastoService categoriaService;

    public GastoService(GastoRepository repository, UsuarioService usuarioService, CategoriaGastoService categoriaService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
        this.categoriaService = categoriaService;
    }

    public List<Gasto> listarTodos() {
        return repository.findAll();
    }

    public Gasto buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Salva um gasto somente se o usuário e a categoria existirem.
     * Retorna null se usuário ou categoria não forem encontrados.
     */
    public Gasto salvar(Gasto gasto) {
        if (gasto == null) throw new BadRequestException("Gasto não pode ser nulo.");
        Usuario u = gasto.getUsuario();
        CategoriaGasto c = gasto.getCategoria();
        if (u == null || u.getId_usuario() == null) throw new BadRequestException("É necessário fornecer um usuário com id para o gasto.");
        if (c == null || c.getId_categoria() == null) throw new BadRequestException("É necessário fornecer uma categoria com id para o gasto.");
        Usuario usuarioExistente = usuarioService.buscarPorId(u.getId_usuario());
        if (usuarioExistente == null) throw new BadRequestException("Usuário com id " + u.getId_usuario() + " não encontrado.");
        CategoriaGasto categoriaExistente = categoriaService.buscarPorId(c.getId_categoria());
        if (categoriaExistente == null) throw new BadRequestException("Categoria com id " + c.getId_categoria() + " não encontrada.");
        // Use as entidades gerenciadas
        gasto.setUsuario(usuarioExistente);
        gasto.setCategoria(categoriaExistente);
        return repository.save(gasto);
    }

    public Gasto atualizar(Long id, Gasto novo) {
        Gasto gasto = buscarPorId(id);
        if (gasto != null) {
            if (novo.getUsuario() != null && novo.getUsuario().getId_usuario() != null) {
                Usuario usuarioExistente = usuarioService.buscarPorId(novo.getUsuario().getId_usuario());
                if (usuarioExistente == null) throw new BadRequestException("Usuário com id " + novo.getUsuario().getId_usuario() + " não encontrado.");
                gasto.setUsuario(usuarioExistente);
            }
            if (novo.getCategoria() != null && novo.getCategoria().getId_categoria() != null) {
                CategoriaGasto categoriaExistente = categoriaService.buscarPorId(novo.getCategoria().getId_categoria());
                if (categoriaExistente == null) throw new BadRequestException("Categoria com id " + novo.getCategoria().getId_categoria() + " não encontrada.");
                gasto.setCategoria(categoriaExistente);
            }
            gasto.setValor(novo.getValor());
            gasto.setData_hora(novo.getData_hora());
            gasto.setDescricao(novo.getDescricao());
            return repository.save(gasto);
        }
        return null;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public List<Gasto> buscarPorUsuario(Usuario usuario) {
        return repository.findByUsuario(usuario);
    }

    public List<Gasto> buscarPorCategoria(CategoriaGasto categoria) {
        return repository.findByCategoria(categoria);
    }

    public List<Gasto> buscarGastosMaioresQue(double valorMinimo) {
        return repository.buscarGastosMaioresQue(valorMinimo);
    }

    public List<Gasto> buscarPorAno(int ano) {
        return repository.buscarPorAno(ano);
    }

    public List<Gasto> buscarPorNomeUsuario(String nome) {
        return repository.buscarPorNomeUsuario(nome);
    }
}
