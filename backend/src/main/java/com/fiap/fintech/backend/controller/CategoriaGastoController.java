package com.fiap.fintech.backend.controller;

import com.fiap.fintech.backend.model.CategoriaGasto;
import com.fiap.fintech.backend.service.CategoriaGastoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaGastoController {

    private final CategoriaGastoService service;

    public CategoriaGastoController(CategoriaGastoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaGasto>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaGasto> buscar(@PathVariable Long id) {
        CategoriaGasto categoria = service.buscarPorId(id);
        return categoria != null ? ResponseEntity.ok(categoria) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CategoriaGasto> criar(@RequestBody CategoriaGasto categoria) {
        return ResponseEntity.status(201).body(service.salvar(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaGasto> atualizar(@PathVariable Long id, @RequestBody CategoriaGasto categoria) {
        CategoriaGasto atualizado = service.atualizar(id, categoria);
        return atualizado != null ? ResponseEntity.ok(atualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
