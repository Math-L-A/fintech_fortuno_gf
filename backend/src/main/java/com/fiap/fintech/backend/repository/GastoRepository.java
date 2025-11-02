package com.fiap.fintech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.fiap.fintech.backend.model.Gasto;
import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.model.CategoriaGasto;

import java.util.List;

@Repository
public interface GastoRepository extends JpaRepository<Gasto, Long> {


    List<Gasto> findByUsuario(Usuario usuario);


    List<Gasto> findByCategoria(CategoriaGasto categoria);


    List<Gasto> findByUsuarioAndCategoria(Usuario usuario, CategoriaGasto categoria);


    @Query("SELECT g FROM Gasto g WHERE g.valor > :valorMinimo")
    List<Gasto> buscarGastosMaioresQue(double valorMinimo);


    @Query("SELECT g FROM Gasto g WHERE EXTRACT(YEAR FROM g.data_hora) = :ano")
    List<Gasto> buscarPorAno(int ano);
}
