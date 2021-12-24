package com.example.classroomservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "CLASSROOM")
@SequenceGenerator(name = "SEQ_CLASSROOM", sequenceName = "SEQ_CLASSROOM")
public class Classroom {

    @Id
    @GeneratedValue(generator = "SEQ_CLASSROOM", strategy = GenerationType.SEQUENCE)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "CODE")
    private String code;

    @Column(name = "STUDENTID")
    private String studentId;

    @Column(name = "TEACHERID")
    private String teacherId;
}
