/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.UserDao;
import com.lb.lbstore.domain.User;
import com.lb.lbstore.service.UserService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 

/**
 *
 * @author Administrator
 */
@Service("userServiceImpl") 
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;
    
    @Override
    public User getUserById(Integer id) {
        User user = new User();
        user.setId(id);
        user.setName("abc");
        userDao.save(user);
        return (User)userDao.findObjectById(User.class, id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from User";
        return userDao.getCount(sql,null);
    }

    @Override
    public List<User> queryUsersByPage(HashMap map) {
        String sql = "select (1) from User";
        return userDao.getPageList(sql,null,1,20);
    }
     
}
