//package com.example.rto.controller;
//
//import com.example.rto.entity.mongoUserEntity;
//import com.example.rto.repo.MongoEmployeeRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1")
//public class MongoRTOController {
//    private final MongoEmployeeRepository mongoEmployeeRepository;
//        @Autowired
//
//     private MongoRTOController(MongoEmployeeRepository mongoEmployeeRepository){
//           this.mongoEmployeeRepository=mongoEmployeeRepository;
//        }
//        @PostMapping("/addEmployee")
//        public String createEmployee(@RequestBody mongoUserEntity empInfo) {
//           mongoEmployeeRepository.save(empInfo);
//           return "created"+empInfo.getName();
//        }
//        @GetMapping("/getEmployee")
//        public List<mongoUserEntity> getAllEmpInfo() {
//            return mongoEmployeeRepository.findAll();
//        }
//}
