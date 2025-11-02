package com.fiap.fintech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.fiap.fintech.backend.model.Investimento;
import com.fiap.fintech.backend.model.Usuario;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {


    List<Investimento> findByUsuario(Usuario usuario);


    List<Investimento> findByTipoInvestimento(String tipoInvestimento);


    List<Investimento> findByDataVencimentoBefore(LocalDate data);


    @Query("SELECT i FROM Investimento i WHERE i.valor >= :valorMinimo")
    List<Investimento> buscarPorValorMinimo(double valorMinimo);
}
