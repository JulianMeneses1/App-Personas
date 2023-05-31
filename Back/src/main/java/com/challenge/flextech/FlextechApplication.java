package com.challenge.flextech;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition (
        info = @Info(
            title="App Personas",
            version = "1.0.0",
            description = "App para gestionar personas"             
        ),
        servers = {
        @Server(url = "/", description = "Default Server URL")
        }
)
public class FlextechApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlextechApplication.class, args);
	}

}
