package com.fiap.fintech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.fiap.fintech.backend.model.CategoriaGasto;

@Repository
public interface CategoriaGastoRepository extends JpaRepository<CategoriaGasto, Long> {


    CategoriaGasto findByNomeCategoria(String nomeCategoria);


    boolean existsByNomeCategoria(String nomeCategoria);
}
