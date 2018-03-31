/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.A01;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface A01Service {

    public A01 getA01ById(Integer id);
    
    public List<A01> getAllA01s();
    
    public boolean updateA01(A01 a01);
    
    public boolean updateA01Qx(A01 a01);
    
    public A01 saveA01(A01 a01);
    
    public boolean deleteA01(Integer id);
    
    public A01 checkLogin(String bh,String password);
    
    public boolean changePassword(int id, String password);
    
    public boolean changeQuanXian(int id, String qx);
    
    public int queryRows(HashMap map);
    
    public List<A01> queryA01sByPage(HashMap map);

}
