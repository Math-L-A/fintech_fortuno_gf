package com.fiap.fintech.backend.controller;

import com.fiap.fintech.backend.model.CategoriaGasto;
import com.fiap.fintech.backend.model.Gasto;
import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.service.GastoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gastos")
public class GastoController {

    private final GastoService service;

    public GastoController(GastoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Gasto>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gasto> buscar(@PathVariable Long id) {
        Gasto gasto = service.buscarPorId(id);
        return gasto != null ? ResponseEntity.ok(gasto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Gasto> criar(@RequestBody Gasto gasto) {
        Gasto criado = service.salvar(gasto);
        return criado != null ? ResponseEntity.status(201).body(criado) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gasto> atualizar(@PathVariable Long id, @RequestBody Gasto gasto) {
        Gasto atualizado = service.atualizar(id, gasto);
        return atualizado != null ? ResponseEntity.ok(atualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // Optional query endpoints (by usuario id or categoria id)
    @GetMapping("/por-usuario/{usuarioId}")
    public ResponseEntity<List<Gasto>> porUsuario(@PathVariable Long usuarioId) {
        Usuario u = new Usuario();
        u.setId_usuario(usuarioId);
        return ResponseEntity.ok(service.buscarPorUsuario(u));
    }

    @GetMapping("/por-categoria/{categoriaId}")
    public ResponseEntity<List<Gasto>> porCategoria(@PathVariable Long categoriaId) {
        CategoriaGasto c = new CategoriaGasto();
        c.setId_categoria(categoriaId);
        return ResponseEntity.ok(service.buscarPorCategoria(c));
    }

    @GetMapping("/maiores-que")
    public ResponseEntity<List<Gasto>> maioresQue(@RequestParam("valor") double valor) {
        return ResponseEntity.ok(service.buscarGastosMaioresQue(valor));
    }

    @GetMapping("/ano/{ano}")
    public ResponseEntity<List<Gasto>> porAno(@PathVariable int ano) {
        return ResponseEntity.ok(service.buscarPorAno(ano));
    }

    @GetMapping("/por-usuario-nome")
    public ResponseEntity<List<Gasto>> porUsuarioNome(@RequestParam("nome") String nome) {
        return ResponseEntity.ok(service.buscarPorNomeUsuario(nome));
    }
}
