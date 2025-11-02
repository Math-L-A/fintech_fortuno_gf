package com.fiap.fintech.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Data
@Table(name = "INVESTIMENTO")
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_investimento;

    // Relacionamento: Muitos investimentos pertencem a um único usuário
    @ManyToOne
    @JoinColumn(name = "USUARIO_id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "tipo_investimento", length = 50)
    private String tipoInvestimento;

    @Column(name = "nome_aplicacao", length = 100)
    private String nomeAplicacao;

    @Column(name = "nome_banco", length = 100)
    private String nomeBanco;

    @Column(precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "data_aplicacao")
    private LocalDate dataAplicacao;

    @Column(name = "data_vencimento")
    private LocalDate dataVencimento;
}
