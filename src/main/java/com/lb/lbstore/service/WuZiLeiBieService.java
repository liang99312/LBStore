/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.WuZiLeiBie;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface WuZiLeiBieService {

    public WuZiLeiBie getWuZiLeiBieById(Integer id);
    
    public List<WuZiLeiBie> getAllWuZiLeiBies(Integer qy_id);
    
    public boolean updateWuZiLeiBie(WuZiLeiBie wuZiLeiBie);
    
    public WuZiLeiBie saveWuZiLeiBie(WuZiLeiBie wuZiLeiBie);
    
    public boolean deleteWuZiLeiBie(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<WuZiLeiBie> queryWuZiLeiBiesByPage(HashMap map);

}
