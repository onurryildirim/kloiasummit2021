package com.example.teacherservice.service;


import com.example.teacherservice.entity.Teacher;
import com.example.teacherservice.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public List<Teacher> getStudents() {
        return teacherRepository.findAll();
    }

    public Teacher createStudent(Teacher student) {
        return teacherRepository.save(student);
    }
}
