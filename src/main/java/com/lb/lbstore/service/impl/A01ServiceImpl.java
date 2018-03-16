/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.A01Dao;
import com.lb.lbstore.domain.A01;
import com.lb.lbstore.service.A01Service;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 

/**
 *
 * @author Administrator
 */
@Service("a01ServiceImpl") 
public class A01ServiceImpl implements A01Service{

    @Autowired
    private A01Dao a01Dao;
    
    @Override
    public A01 getA01ById(Integer id) {
        return (A01)a01Dao.findObjectById(A01.class, id);
    }
    
    @Override
    public List<A01> getAllA01s(){
        return a01Dao.getResult("from A01 a01", null);
    }

    @Override
    public boolean updateA01(A01 a01) {
        return a01Dao.update(a01);
    }

    @Override
    public A01 saveA01(A01 a01) {
        int id = a01Dao.save(a01);
        return (A01)a01Dao.findObjectById(A01.class, id);
    }

    @Override
    public boolean deleteA01(Integer id) {
        return a01Dao.deleteObjById("a01", id);
    }

    @Override
    public A01 checkLogin(String bh,String password) {
        return a01Dao.checkLogin(bh, password);
    }
     
    @Override
    public boolean changePassword(int id, String password){
        return a01Dao.changePassword(id, password);
    }
    
    @Override
    public boolean changeQuanXian(int id, String qx){
        return a01Dao.changeQuanXian(id, qx);
    }
    
    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from A01 where state < 9";
        return a01Dao.getCount(sql,null);
    }

    @Override
    public List<A01> queryA01sByPage(HashMap map) {
        String hql = "from A01 where state < 9";
        return a01Dao.getPageList(hql,null,1,20);
    }

}
