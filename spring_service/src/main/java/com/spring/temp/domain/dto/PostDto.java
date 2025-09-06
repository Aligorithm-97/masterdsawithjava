package com.spring.temp.domain.dto;


public class PostDto {

    private String title;
    private String summary;
    private String blocks;
    private String category;
    private String date;


    public PostDto(String title, String summary, String blocks, String category, String date) {
        this.title = title;
        this.summary = summary;
        this.blocks = blocks;
        this.category = category;
        this.date = date;
    }

    public PostDto() {
    }

    public static PostDtoBuilder builder() {
        return new PostDtoBuilder();
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

    public static class PostDtoBuilder {
        private String title;
        private String summary;
        private String blocks;
        private String category;
        private String date;

        PostDtoBuilder() {
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

        public PostDto build() {
            return new PostDto(this.title, this.summary, this.blocks, this.category, this.date);
        }

        public String toString() {
            return "PostDto.PostDtoBuilder(title=" + this.title + ", summary=" + this.summary + ", blocks=" + this.blocks + ", category=" + this.category + ", date=" + this.date + ")";
        }
    }
}
