/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.WuZiZiDian;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface WuZiZiDianService {

    public WuZiZiDian getWuZiZiDianById(Integer id);
    
    public List<WuZiZiDian> getAllWuZiZiDians(Integer qy_id);
    
    public List<WuZiZiDian> getWuZiZiDianByWzlbId(Integer wzlb_id);
    
    public boolean updateWuZiZiDian(WuZiZiDian wuZiZiDian);
    
    public WuZiZiDian saveWuZiZiDian(WuZiZiDian wuZiZiDian);
    
    public boolean deleteWuZiZiDian(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<WuZiZiDian> queryWuZiZiDiansByPage(HashMap map);

}
