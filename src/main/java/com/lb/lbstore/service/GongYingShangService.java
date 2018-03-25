/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.GongYingShang;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface GongYingShangService {

    public GongYingShang getGongYingShangById(Integer id);
    
    public List<GongYingShang> getAllGongYingShangs(Integer qy_id);
    
    public boolean updateGongYingShang(GongYingShang gongYingShang);
    
    public GongYingShang saveGongYingShang(GongYingShang gongYingShang);
    
    public boolean deleteGongYingShang(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<GongYingShang> queryGongYingShangsByPage(HashMap map);

}
