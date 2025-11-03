package com.fiap.fintech.backend.controller;

import com.fiap.fintech.backend.model.Investimento;
import com.fiap.fintech.backend.service.InvestimentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/investimentos")
public class InvestimentoController {

    private final InvestimentoService service;

    public InvestimentoController(InvestimentoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Investimento>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Investimento> buscar(@PathVariable Long id) {
        Investimento investimento = service.buscarPorId(id);
        return investimento != null ? ResponseEntity.ok(investimento) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Investimento> criar(@RequestBody Investimento investimento) {
        Investimento criado = service.salvar(investimento);
        return criado != null ? ResponseEntity.status(201).body(criado) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Investimento> atualizar(@PathVariable Long id, @RequestBody Investimento investimento) {
        Investimento atualizado = service.atualizar(id, investimento);
        return atualizado != null ? ResponseEntity.ok(atualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/por-valor-minimo")
    public ResponseEntity<List<Investimento>> porValorMinimo(@RequestParam("valor") double valor) {
        return ResponseEntity.ok(service.buscarPorValorMinimo(valor));
    }

    @GetMapping("/vencem-antes")
    public ResponseEntity<List<Investimento>> vencemAntes(@RequestParam("data") java.time.LocalDate data) {
        return ResponseEntity.ok(service.buscarPorDataVencimentoAntes(data));
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Investimento>> porTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(service.buscarPorTipo(tipo));
    }
}
