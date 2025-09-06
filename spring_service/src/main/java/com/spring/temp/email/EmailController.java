package com.spring.temp.email;

import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/sendEmail")
    public void sendEmail(String[] recipientsArray, String subject, String message) throws MessagingException {
        emailService.sendEmailToRelatedUsers(recipientsArray, !subject.isEmpty() ? subject : "defaultSubject", message);
    }

}
