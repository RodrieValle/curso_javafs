package com.mitocode.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.model.Signos;
import com.mitocode.model.Paciente;
import com.mitocode.repo.IPacienteRepo;
import com.mitocode.repo.ISignosRepo;
import com.mitocode.service.ISignosService;

@Service
public class SignosServiceImpl implements ISignosService{

	@Autowired	
	private ISignosRepo repo;
	
	@Autowired
	private IPacienteRepo repopaciente;
	
	@Override
	@Transactional
	public Signos registrar(Signos obj) {
		if(obj.getPaciente().getIdPaciente() == null) {
			Paciente p = repopaciente.save(obj.getPaciente());
			obj.setPaciente(p);
		}
		return repo.save(obj);
	}

	@Override
	public Signos modificar(Signos obj) {		
		return repo.save(obj);
	}

	@Override
	public List<Signos> listar() {
		return repo.findAll();
	}

	@Override
	public Signos leerPorId(Integer id) {
		Optional<Signos> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Signos();
	}

	@Override
	public boolean eliminar(Integer id) {		
		repo.deleteById(id);
		return true;
	}

}
