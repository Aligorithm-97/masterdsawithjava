package com.spring.temp.domain.dto;


public class PostDto {

    private Long id;
    private String title;
    private String summary;
    private String blocks;
    private String category;
    private String date;
    private Integer subscriberOnly;

    public PostDto(Long id, String title, String summary, String blocks, String category, String date, Integer subscriberOnly) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.blocks = blocks;
        this.category = category;
        this.date = date;
        this.subscriberOnly = subscriberOnly;
    }

    public PostDto() {
    }

    public static PostDtoBuilder builder() {
        return new PostDtoBuilder();
    }

    public Long getId() {
        return id;
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

    public static class PostDtoBuilder {
        private Long id;
        private String title;
        private String summary;
        private String blocks;
        private String category;
        private String date;
        private Integer subscriberOnly;

        PostDtoBuilder() {
        }

        public PostDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PostDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public PostDtoBuilder summary(String summary) {
            this.summary = summary;
            return this;
        }

        public PostDtoBuilder blocks(String blocks) {
            this.blocks = blocks;
            return this;
        }

        public PostDtoBuilder category(String category) {
            this.category = category;
            return this;
        }

        public PostDtoBuilder date(String date) {
            this.date = date;
            return this;
        }

        public PostDtoBuilder subscriberOnly(Integer subscriberOnly) {
            this.subscriberOnly = subscriberOnly;
            return this;
        }

        public PostDto build() {
            return new PostDto(this.id, this.title, this.summary, this.blocks, this.category, this.date, this.subscriberOnly);
        }

        public String toString() {
            return "PostDto.PostDtoBuilder(title=" + this.title + ", summary=" + this.summary + ", blocks=" + this.blocks + ", category=" + this.category + ", date=" + this.date + ")";
        }
    }
}
