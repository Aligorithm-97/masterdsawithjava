package com.spring.temp.domain.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Page {

    // If you want to authenticate users also by page you can use it otherwise you can delete and use just role-based authentication.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pageName;
    private String pagePath;
    private String pageLevel;


    @ManyToMany(mappedBy = "pages")
    @JsonIgnore
    private List<User> users;

    public Page(Long id, String pageName, String pagePath, String pageLevel, List<User> users) {
        this.id = id;
        this.pageName = pageName;
        this.pagePath = pagePath;
        this.pageLevel = pageLevel;
        this.users = users;
    }

    public Page() {
    }

    public static PageBuilder builder() {
        return new PageBuilder();
    }

    public Long getId() {
        return this.id;
    }

    public String getPageName() {
        return this.pageName;
    }

    public String getPagePath() {
        return this.pagePath;
    }

    public String getPageLevel() {
        return this.pageLevel;
    }

    public List<User> getUsers() {
        return this.users;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public void setPagePath(String pagePath) {
        this.pagePath = pagePath;
    }

    public void setPageLevel(String pageLevel) {
        this.pageLevel = pageLevel;
    }

    @JsonIgnore
    public void setUsers(List<User> users) {
        this.users = users;
    }

    public static class PageBuilder {
        private Long id;
        private String pageName;
        private String pagePath;
        private String pageLevel;
        private List<User> users;

        PageBuilder() {
        }

        public PageBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PageBuilder pageName(String pageName) {
            this.pageName = pageName;
            return this;
        }

        public PageBuilder pagePath(String pagePath) {
            this.pagePath = pagePath;
            return this;
        }

        public PageBuilder pageLevel(String pageLevel) {
            this.pageLevel = pageLevel;
            return this;
        }

        @JsonIgnore
        public PageBuilder users(List<User> users) {
            this.users = users;
            return this;
        }

        public Page build() {
            return new Page(this.id, this.pageName, this.pagePath, this.pageLevel, this.users);
        }

        public String toString() {
            return "Page.PageBuilder(id=" + this.id + ", pageName=" + this.pageName + ", pagePath=" + this.pagePath + ", pageLevel=" + this.pageLevel + ", users=" + this.users + ")";
        }
    }
}
