package com.rodrigoahv.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rodrigoahv.model.Persona;

public interface IPersonaRepo extends JpaRepository<Persona, Integer> {

}
