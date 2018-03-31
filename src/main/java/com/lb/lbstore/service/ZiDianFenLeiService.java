/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.ZiDianFenLei;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface ZiDianFenLeiService {

    public ZiDianFenLei getZiDianFenLeiById(Integer id);
    
    public List<ZiDianFenLei> getAllZiDianFenLeis(Integer qy_id);
    
    public boolean updateZiDianFenLei(ZiDianFenLei ziDianFenLei);
    
    public ZiDianFenLei saveZiDianFenLei(ZiDianFenLei ziDianFenLei);
    
    public boolean deleteZiDianFenLei(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<ZiDianFenLei> queryZiDianFenLeisByPage(HashMap map);

}
