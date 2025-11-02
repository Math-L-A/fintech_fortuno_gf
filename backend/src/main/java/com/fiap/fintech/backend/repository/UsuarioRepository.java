package com.fiap.fintech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.fiap.fintech.backend.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


    Usuario findByEmail(String email);


    boolean existsByEmail(String email);


    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nomeCompleto) LIKE LOWER(CONCAT('%', :nome, '%'))")
    java.util.List<Usuario> buscarPorNomeParcial(String nome);
}
