package com.fiap.fintech.backend.controller;

import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscar(@PathVariable Long id) {
        Usuario usuario = service.buscarPorId(id);
        return usuario != null ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        Usuario criado = service.salvar(usuario);
        return ResponseEntity.status(201).body(criado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario atualizado = service.atualizar(id, usuario);
        return atualizado != null ? ResponseEntity.ok(atualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Usuario>> buscarPorNome(@RequestParam("nome") String nome) {
        return ResponseEntity.ok(service.buscarPorNomeParcial(nome));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> buscarPorEmail(@PathVariable String email) {
        Usuario u = service.buscarPorEmail(email);
        return u != null ? ResponseEntity.ok(u) : ResponseEntity.notFound().build();
    }
}
