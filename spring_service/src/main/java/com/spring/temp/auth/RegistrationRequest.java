package com.spring.temp.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;


public class RegistrationRequest {

    @NotEmpty(message = "FirstName required !")
    @NotBlank(message = "FirstName required !")
    private String firstName;
    @NotEmpty(message = "LastName required !")
    @NotBlank(message = "LastName required !")
    private String lastName;
    @Email(message = "Email format required !")
    @NotEmpty(message = "Email required !")
    @NotBlank(message = "Email required !")
    private String email;
    @NotEmpty(message = "Password required !")
    @NotBlank(message = "Password required !")
    @Size(min = 8, message = "Min 8 Characters !")
    private String password;

    public RegistrationRequest(@NotEmpty(message = "FirstName required !") @NotBlank(message = "FirstName required !") String firstName, @NotEmpty(message = "LastName required !") @NotBlank(message = "LastName required !") String lastName, @Email(message = "Email format required !") @NotEmpty(message = "Email required !") @NotBlank(message = "Email required !") String email, @NotEmpty(message = "Password required !") @NotBlank(message = "Password required !") @Size(min = 8, message = "Min 8 Characters !") String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public RegistrationRequest() {
    }

    public static RegistrationRequestBuilder builder() {
        return new RegistrationRequestBuilder();
    }

    public @NotEmpty(message = "FirstName required !") @NotBlank(message = "FirstName required !") String getFirstName() {
        return this.firstName;
    }

    public @NotEmpty(message = "LastName required !") @NotBlank(message = "LastName required !") String getLastName() {
        return this.lastName;
    }

    public @Email(message = "Email format required !") @NotEmpty(message = "Email required !") @NotBlank(message = "Email required !") String getEmail() {
        return this.email;
    }

    public @NotEmpty(message = "Password required !") @NotBlank(message = "Password required !") @Size(min = 8, message = "Min 8 Characters !") String getPassword() {
        return this.password;
    }

    public void setFirstName(@NotEmpty(message = "FirstName required !") @NotBlank(message = "FirstName required !") String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(@NotEmpty(message = "LastName required !") @NotBlank(message = "LastName required !") String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(@Email(message = "Email format required !") @NotEmpty(message = "Email required !") @NotBlank(message = "Email required !") String email) {
        this.email = email;
    }

    public void setPassword(@NotEmpty(message = "Password required !") @NotBlank(message = "Password required !") @Size(min = 8, message = "Min 8 Characters !") String password) {
        this.password = password;
    }

    public static class RegistrationRequestBuilder {
        private @NotEmpty(message = "FirstName required !")
        @NotBlank(message = "FirstName required !") String firstName;
        private @NotEmpty(message = "LastName required !")
        @NotBlank(message = "LastName required !") String lastName;
        private @Email(message = "Email format required !")
        @NotEmpty(message = "Email required !")
        @NotBlank(message = "Email required !") String email;
        private @NotEmpty(message = "Password required !")
        @NotBlank(message = "Password required !")
        @Size(min = 8, message = "Min 8 Characters !") String password;

        RegistrationRequestBuilder() {
        }

        public RegistrationRequestBuilder firstName(@NotEmpty(message = "FirstName required !") @NotBlank(message = "FirstName required !") String firstName) {
            this.firstName = firstName;
            return this;
        }

        public RegistrationRequestBuilder lastName(@NotEmpty(message = "LastName required !") @NotBlank(message = "LastName required !") String lastName) {
            this.lastName = lastName;
            return this;
        }

        public RegistrationRequestBuilder email(@Email(message = "Email format required !") @NotEmpty(message = "Email required !") @NotBlank(message = "Email required !") String email) {
            this.email = email;
            return this;
        }

        public RegistrationRequestBuilder password(@NotEmpty(message = "Password required !") @NotBlank(message = "Password required !") @Size(min = 8, message = "Min 8 Characters !") String password) {
            this.password = password;
            return this;
        }

        public RegistrationRequest build() {
            return new RegistrationRequest(this.firstName, this.lastName, this.email, this.password);
        }

        public String toString() {
            return "RegistrationRequest.RegistrationRequestBuilder(firstName=" + this.firstName + ", lastName=" + this.lastName + ", email=" + this.email + ", password=" + this.password + ")";
        }
    }
}
