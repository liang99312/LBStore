/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.QiYe;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface QiYeService {

    public QiYe getQiYeById(Integer id);
    
    public List<QiYe> getAllQiYes();
    
    public boolean updateQiYe(QiYe qiYe);
    
    public QiYe saveQiYe(QiYe qiYe);
    
    public boolean deleteQiYe(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<QiYe> queryQiYesByPage(HashMap map);

}
