package com.fiap.fintech.backend.service;

import com.fiap.fintech.backend.model.CategoriaGasto;
import com.fiap.fintech.backend.repository.CategoriaGastoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaGastoService {
    private final CategoriaGastoRepository repository;

    public CategoriaGastoService(CategoriaGastoRepository repository) {
        this.repository = repository;
    }

    public List<CategoriaGasto> listarTodos() {
        return repository.findAll();
    }

    public CategoriaGasto buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public CategoriaGasto salvar(CategoriaGasto categoria) {
        return repository.save(categoria);
    }

    public CategoriaGasto atualizar(Long id, CategoriaGasto novo) {
        CategoriaGasto categoria = buscarPorId(id);
        if (categoria != null) {
            categoria.setNomeCategoria(novo.getNomeCategoria());
            return repository.save(categoria);
        }
        return null;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
