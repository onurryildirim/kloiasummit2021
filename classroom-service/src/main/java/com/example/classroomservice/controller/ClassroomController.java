package com.example.classroomservice.controller;


import com.example.classroomservice.entity.Classroom;
import com.example.classroomservice.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("classrooms")
public class ClassroomController {

    private final ClassroomService classroomService;

    @GetMapping
    public List<Classroom> getStudents() {
        return classroomService.getStudents();
    }

    @PostMapping
    public Classroom createStudent(@RequestBody Classroom student) {
        return classroomService.createStudent(student);
    }
}
