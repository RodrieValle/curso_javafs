package com.rodrigoahv.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rodrigoahv.model.Venta;

public interface IVentaRepo extends JpaRepository<Venta, Integer> {

}
