package com.spring.temp.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {


    @KafkaListener(topics = "${app.kafka.topic}", groupId = "go-spring-group")
    public void consume(ConsumerRecord<String, String> record) {
        System.out.println("Go’dan gelen mesaj: " + record.value());
    }
    
}
