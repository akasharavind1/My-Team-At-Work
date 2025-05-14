package com.example.rto.controller;
import com.example.rto.dto.DateUserResponse;
import com.example.rto.dto.EmployeeDetailsDTO;
import com.example.rto.dto.UserDTO;
import com.example.rto.entity.UserEntity;
import com.example.rto.entity.UserEntityAttendance;
import com.example.rto.repo.EmployeeAttendanceRepository;
import com.example.rto.repo.EmployeeRepository;
import com.example.rto.service.RtoService;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class RtoController {
    private final EmployeeRepository employeeRepository;
    private final RtoService rtoService;
    private final EmployeeAttendanceRepository employeeAttendanceRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(RtoController.class);
    @Autowired
    public RtoController(EmployeeRepository employeeRepository, RtoService rtoService, EmployeeAttendanceRepository employeeAttendanceRepository) {
        this.employeeRepository = employeeRepository;
        this.rtoService = rtoService;
        this.employeeAttendanceRepository = employeeAttendanceRepository;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserEntity loginInfo) {
        LOGGER.info("Mail ID and password given by the user"+loginInfo);
        return ResponseEntity.ok(this.rtoService.login(loginInfo));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> postEmployee(@RequestBody UserEntity newEmployeeInfo) {
        LOGGER.info("Creating a new user record"+newEmployeeInfo);
        return ResponseEntity.ok(rtoService.signup(newEmployeeInfo));
    }

    @GetMapping("/getLogin")
    public ResponseEntity<List<EmployeeDetailsDTO> >employeeDetails() {
        return ResponseEntity.ok(rtoService.employeeDetails());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity updateEmployee(@PathVariable Integer id, @RequestBody UserEntity user) {
        LOGGER.info("Updating the employee record by id "+id+","+user);
        return ResponseEntity.ok(rtoService.updateService(id, user));
    }

    @DeleteMapping("/delete")
    public void deleteEmployee(@RequestParam Integer id) {
        LOGGER.info("Deleting the employee record by id"+id);
        rtoService.deleteEmployee(id);
    }

    @GetMapping("/employeeInfo/{id}")
    public ResponseEntity getEmployee(@PathVariable Integer id) {
        LOGGER.info("Getting specific employee info"+id);
        return ResponseEntity.ok(rtoService.getEmpInfo(id));
    }
    @PostMapping("/matchDates")
    public ResponseEntity<List<DateUserResponse>> getEmpByDate(@RequestBody List<Date> dates) {
        LOGGER.info("Dates for checking the employee availability"+dates);
        return ResponseEntity.ok(rtoService.getEmpByDate(dates));
    }
    @GetMapping("/getDates/{empId}")
    public ResponseEntity<List<UserEntityAttendance>> getAllDates(@PathVariable Integer empId) {
        LOGGER.info("Getting dates for particular employee"+empId);
        return rtoService.getUserAttendance(empId);
    }
    @GetMapping("/getDates2/{empId}")
    public List<String> getDates2(@PathVariable Integer empId) {
        LOGGER.info("Getting dates for particular employee"+empId);
        return rtoService.demo(empId);
    }
    @PostMapping("/postDates/{id}")
    public ResponseEntity postDates(@PathVariable Integer id, @RequestBody List<Date> dates) throws ParseException {
        LOGGER.info("particular employee id and his dates for adding entry"+id+","+dates);
        return ResponseEntity.ok(rtoService.addDates(id, dates));
    }
    @PutMapping("/updatePassword/{id}")
    public ResponseEntity updatePasswords(@PathVariable Integer id, @RequestBody UserEntity user ){
        return ResponseEntity.ok(rtoService.updatePassword(id,  user));
    }
    @GetMapping("/empDetailsBypagination/{field}")
    public List<EmployeeDetailsDTO> getempDetailsByPagination(@PathVariable String field){
        return rtoService.paginationSorting(field);
    }
    @GetMapping("/empDetailsBypaginationsort/{offset}/{pagesize}/{field}")
    public Page<EmployeeDetailsDTO> getempDetailsByPaginationsort(@PathVariable Integer offset, @PathVariable Integer pagesize,@PathVariable String field){
        return rtoService.paginationWithSorting(offset, pagesize, field);
    }
    @GetMapping("/getAttendanceReport")
    public Map<String, List<Date>> getAttendanceReport() throws ParseException {
        return rtoService.demo();
    }
}


