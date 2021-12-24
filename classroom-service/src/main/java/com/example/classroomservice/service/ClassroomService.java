package com.example.classroomservice.service;

import com.example.classroomservice.entity.Classroom;
import com.example.classroomservice.repository.ClassroomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassroomService {

    private final ClassroomRepository classroomRepository;

    public List<Classroom> getStudents() {
        return classroomRepository.findAll();
    }

    public Classroom createStudent(Classroom student) {
        return classroomRepository.save(student);
    }
}
