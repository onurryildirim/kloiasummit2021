package com.example.teacherservice.controller;


import com.example.teacherservice.entity.Teacher;
import com.example.teacherservice.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("teachers")
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping
    public List<Teacher> getStudents() {
        return teacherService.getStudents();
    }

    @PostMapping
    public Teacher createStudent(@RequestBody Teacher student) {
        return teacherService.createStudent(student);
    }
}
