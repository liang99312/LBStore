/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.ZiDian;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface ZiDianService {

    public ZiDian getZiDianById(Integer id);
    
    public List<ZiDian> getAllZiDians4fl(Integer qy_id,Integer zdfl_id);
    
    public boolean updateZiDian(ZiDian ziDian);
    
    public ZiDian saveZiDian(ZiDian ziDian);
    
    public boolean deleteZiDian(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<ZiDian> queryZiDiansByPage(HashMap map);

}
