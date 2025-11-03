package com.fiap.fintech.backend.service;

import com.fiap.fintech.backend.model.Investimento;
import com.fiap.fintech.backend.model.Usuario;
import com.fiap.fintech.backend.repository.InvestimentoRepository;
import com.fiap.fintech.backend.exception.BadRequestException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InvestimentoService {
    private final InvestimentoRepository repository;
    private final UsuarioService usuarioService;

    public InvestimentoService(InvestimentoRepository repository, UsuarioService usuarioService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
    }

    public List<Investimento> listarTodos() {
        return repository.findAll();
    }

    public Investimento buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Salva apenas se o usuário existir. Retorna null caso contrário.
     */
    public Investimento salvar(Investimento investimento) {
        if (investimento == null) throw new BadRequestException("Investimento não pode ser nulo.");
        if (investimento.getUsuario() == null || investimento.getUsuario().getId_usuario() == null)
            throw new BadRequestException("É necessário fornecer um usuário com id para o investimento.");
        Usuario u = usuarioService.buscarPorId(investimento.getUsuario().getId_usuario());
        if (u == null) throw new BadRequestException("Usuário com id " + investimento.getUsuario().getId_usuario() + " não encontrado.");
        investimento.setUsuario(u);
        return repository.save(investimento);
    }

    public Investimento atualizar(Long id, Investimento novo) {
        Investimento investimento = buscarPorId(id);
        if (investimento != null) {
            if (novo.getUsuario() != null && novo.getUsuario().getId_usuario() != null) {
                Usuario u = usuarioService.buscarPorId(novo.getUsuario().getId_usuario());
                if (u == null) throw new BadRequestException("Usuário com id " + novo.getUsuario().getId_usuario() + " não encontrado.");
                investimento.setUsuario(u);
            }
            investimento.setTipoInvestimento(novo.getTipoInvestimento());
            investimento.setNomeAplicacao(novo.getNomeAplicacao());
            investimento.setNomeBanco(novo.getNomeBanco());
            investimento.setValor(novo.getValor());
            investimento.setDataAplicacao(novo.getDataAplicacao());
            investimento.setDataVencimento(novo.getDataVencimento());
            return repository.save(investimento);
        }
        return null;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public List<Investimento> buscarPorValorMinimo(double valorMinimo) {
        return repository.buscarPorValorMinimo(valorMinimo);
    }

    public List<Investimento> buscarPorDataVencimentoAntes(LocalDate data) {
        return repository.findByDataVencimentoBefore(data);
    }

    public List<Investimento> buscarPorTipo(String tipo) {
        return repository.findByTipoInvestimento(tipo);
    }
}
