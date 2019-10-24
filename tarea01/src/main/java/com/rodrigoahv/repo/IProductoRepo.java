package com.rodrigoahv.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rodrigoahv.model.Producto;

public interface IProductoRepo extends JpaRepository<Producto, Integer> {

}
