/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.HuanKu;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface HuanKuService {

    public HuanKu getHuanKuById(Integer id);
    
    public HuanKu getHuanKuDetailById(Integer id);
       
    public boolean updateHuanKu(HuanKu huanKu);
    
    public String dealHuanKu(HuanKu huanKu,Integer a01_id);
    
    public HuanKu saveHuanKu(HuanKu huanKu);
    
    public boolean deleteHuanKu(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<HuanKu> queryHuanKusByPage(HashMap map);

}
