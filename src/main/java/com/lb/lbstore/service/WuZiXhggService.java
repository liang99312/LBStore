/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.WuZiXhgg;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface WuZiXhggService {

    public WuZiXhgg getWuZiXhggById(Integer id);
    
    public List<WuZiXhgg> getWuZiXhgg4zd(Integer wzzd_id);
    
    public boolean updateWuZiXhgg(WuZiXhgg wuZiXhgg);
    
    public WuZiXhgg saveWuZiXhgg(WuZiXhgg wuZiXhgg);
    
    public boolean deleteWuZiXhgg(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<WuZiXhgg> queryWuZiXhggsByPage(HashMap map);

}
