/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.BuMen;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface BuMenService {

    public BuMen getBuMenById(Integer id);
    
    public List<BuMen> getAllBuMens(Integer qy_id);
    
    public boolean existBuMen(Integer qy_id, Integer id, String mc);
    
    public boolean updateBuMen(BuMen buMen);
    
    public BuMen saveBuMen(BuMen buMen);
    
    public boolean deleteBuMen(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<BuMen> queryBuMensByPage(HashMap map);

}
