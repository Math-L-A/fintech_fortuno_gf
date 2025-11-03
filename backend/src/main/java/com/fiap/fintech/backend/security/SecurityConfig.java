package com.fiap.fintech.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // permitir o endpoint de login sem autenticação
                .requestMatchers("/auth/login").permitAll()
                // permitir criar/editar/deletar recursos sem autenticação (POST/PUT/DELETE)
                .requestMatchers(HttpMethod.POST, "/gastos/**", "/investimentos/**", "/categorias/**", "/usuarios/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/gastos/**", "/investimentos/**", "/categorias/**", "/usuarios/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/gastos/**", "/investimentos/**", "/categorias/**", "/usuarios/**").permitAll()
                // todas as demais requisições exigem autenticação
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
