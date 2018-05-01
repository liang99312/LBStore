/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.RuKu;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface RuKuService {

    public RuKu getRuKuById(Integer id);
    
    public RuKu getRuKuDetailById(Integer id);
    
    public List<RuKu> getAllRuKus(Integer qy_id);
    
    public boolean updateRuKu(RuKu ruKu);
    
    public boolean dealRuKu(RuKu ruKu,Integer a01_id);
    
    public RuKu saveRuKu(RuKu ruKu);
    
    public boolean deleteRuKu(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<RuKu> queryRuKusByPage(HashMap map);

}
