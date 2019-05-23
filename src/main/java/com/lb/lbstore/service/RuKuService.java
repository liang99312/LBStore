/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.RuKuFei;
import com.lb.lbstore.domain.RuKu;
import com.lb.lbstore.domain.RuKuDetail;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface RuKuService {

    public RuKu getRuKuById(Integer id);
    
    public RuKu getRuKuWithDetailById(Integer id);
    
    public List<RuKu> getAllRuKus(Integer qy_id);
    
    public List<RuKuDetail> getRuKuByWzid_100(Integer wzzd_id);
    
    public boolean updateRuKu(RuKu ruKu);
    
    public boolean dealRuKu(RuKu ruKu,Integer a01_id);
    
    public RuKu saveRuKu(RuKu ruKu);
    
    public boolean deleteRuKu(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<RuKu> queryRuKusByPage(HashMap map);
    
    public int queryFeiRows(HashMap map);
    
    public List<RuKuFei> queryRuKuFeisByPage(HashMap map);
    
    public RuKuFei getRuKuFeiById(Integer id);

     public boolean updateRuKuFei(RuKuFei ruKuFei);
       
    public RuKuFei saveRuKuFei(RuKuFei ruKuFei);
    
    public boolean deleteRuKuFei(Integer id,Integer rk_id);

}
