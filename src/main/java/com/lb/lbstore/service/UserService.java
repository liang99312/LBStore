/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.User;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface UserService {

    public User getUserById(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<User> queryUsersByPage(HashMap map);

}
