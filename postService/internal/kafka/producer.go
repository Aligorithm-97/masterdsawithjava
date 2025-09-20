package kafka

import (
	"log"

	"github.com/IBM/sarama"
)

var Producer sarama.SyncProducer

func InitKafka(brokers []string) {
	config := sarama.NewConfig()
	config.Producer.Return.Successes = true

	var err error
	Producer, err = sarama.NewSyncProducer(brokers, config)
	if err != nil {
		log.Fatal("Kafka producer başlatılamadı:", err)
	}
}

func Publish(topic, message string) error {
	msg := &sarama.ProducerMessage{
		Topic: topic,
		Value: sarama.StringEncoder(message),
	}

	_, _, err := Producer.SendMessage(msg)
	return err
}
