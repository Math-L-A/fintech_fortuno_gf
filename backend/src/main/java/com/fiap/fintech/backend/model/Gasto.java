package com.fiap.fintech.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "GASTO")
public class Gasto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_gasto;

    @ManyToOne
    @JoinColumn(name = "USUARIO_id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "CATEGORIA_GASTO_id_categoria")
    private CategoriaGasto categoria;

    private Double valor;
    private LocalDate data_hora;
    private String descricao;
}
