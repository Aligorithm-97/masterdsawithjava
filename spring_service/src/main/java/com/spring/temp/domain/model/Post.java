package com.spring.temp.domain.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Post {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String summary;
    private String blocks;
    private String category;
    private String date;
    private Integer subscriberOnly;

    public Post(Long id, String title, String summary, String blocks, String category, String date, Integer subscriberOnly) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.blocks = blocks;
        this.category = category;
        this.date = date;
        this.subscriberOnly = subscriberOnly;
    }

    public Post() {
    }

    public static PostBuilder builder() {
        return new PostBuilder();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return this.summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getBlocks() {
        return this.blocks;
    }

    public void setBlocks(String blocks) {
        this.blocks = blocks;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getSubscriberOnly() {
        return subscriberOnly;
    }

    public void setSubscriberOnly(Integer subscriberOnly) {
        this.subscriberOnly = subscriberOnly;
    }

    public static class PostBuilder {
        private Long id;
        private String title;
        private String summary;
        private String blocks;
        private String category;
        private String date;
        private Integer subscriberOnly;

        PostBuilder() {
        }

        public PostBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PostBuilder title(String title) {
            this.title = title;
            return this;
        }

        public PostBuilder summary(String summary) {
            this.summary = summary;
            return this;
        }

        public PostBuilder blocks(String blocks) {
            this.blocks = blocks;
            return this;
        }

        public PostBuilder category(String category) {
            this.category = category;
            return this;
        }

        public PostBuilder date(String date) {
            this.date = date;
            return this;
        }

        public PostBuilder subscriberOnly(Integer subscriberOnly) {
            this.subscriberOnly = subscriberOnly;
            return this;
        }

        public Post build() {
            return new Post(this.id, this.title, this.summary, this.blocks, this.category, this.date, this.subscriberOnly);
        }

        public String toString() {
            return "Post.PostBuilder(id=" + this.id + ", title=" + this.title + ", summary=" + this.summary + ", blocks=" + this.blocks + ", category=" + this.category + ", date=" + this.date + ")";
        }
    }
}
